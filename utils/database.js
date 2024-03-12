import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');
let readOnly = true;

export async function createTable() {
    
    const createTableSQL = `CREATE TABLE IF NOT EXISTS menu (
        uuid integer primary key not null, 
        name text,     
        description text, 
        price text,
        category text
    );`;

    readOnly = false;
    await db.transactionAsync(async tx => {
        await tx.executeSqlAsync(createTableSQL, []);        
    }, readOnly);

}

export async function getMenuItemsFromDB() {

    readOnly = true;
    let resultArray = [];

    await db.transactionAsync(async tx => {
        const result  = await tx.executeSqlAsync('select * from menu;', []);
        resultArray = result.rows;        
    }, readOnly);  

    return resultArray;
}

export function saveMenuItemsInDB(menuItems) {

    readOnly = false;
    
    db.transaction(async tx => {
        let uuid = 0;
        const insertRowsSQL = 
            `INSERT INTO menu
            (uuid, name, description, price, category)
            VALUES
            ${menuItems
                .map(
                    (item) => {
                        uuid = uuid + 1;
                        const row = `(${uuid}, '${item.name}', '${item.description.replace(/\'/g,"''")}', '${item.price}', '${item.category}')`;
                        return(row);
                    }
                )
            .join(', ')};`;

        tx.executeSql(insertRowsSQL, []);
                        
    }, readOnly);     
    
};

export async function filterByQueryAndCategoriesFromDB(query, activeCategories) {

    readOnly = false;
    let resultArray = [];

    await db.transactionAsync(async tx => {

        const categoriesSQL = 
            `
                SELECT * 
                FROM menu 
                WHERE 
                    ${
                        activeCategories
                        .map((category) => `category='${category.toLowerCase()}'`)
                        .join(' OR ')
                    }
            ;`;
        
        const queryAndCategoriesSQL = 
            `
                SELECT * 
                FROM menu 
                WHERE 
                    (name like '%${query}%')
                    AND
                    (
                    ${
                        activeCategories
                        .map((category) => `category='${category.toLowerCase()}'`)
                        .join(' OR ')
                    }
                    )
            ;`;
        
        let result;

        if (!query) {

            result = await tx.executeSqlAsync(categoriesSQL, []);

        } else {

            result = await tx.executeSqlAsync(queryAndCategoriesSQL, []);

        }
  
        resultArray = result.rows;
        
    }, readOnly);    

    return resultArray;
}