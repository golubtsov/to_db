const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_carabin'
}

const sql = require('./sql/sql.json');

const pool = mysql.createPool(config);

function create_query(arr){
    for (let i = 0; i < arr.length; i++) {
        let str = `INSERT INTO products(id, id_cat, name_product, product_url, popular, new, price, about, produser) VALUES ('${arr[i].id}',${arr[i].id_cat},'${arr[i].name_product}','${arr[i].product_url}',${boolean_el()},${boolean_el()},${arr[i].price},'${arr[i].about}','${arr[i].produser}')`;
        send_db(str);
    }
}

function send_db(sql){
    pool.query(sql, (err, res) => {
        if(err){
            console.log(err.message);
        } else {
            console.log('Запрос отправлены успешно!');
        }
    });
}

// ф-ия, которая возвращает true || false, значение используется для определения популярности и новизны товара
function boolean_el() {
    let num = Math.floor(Math.random() * 2);
    if (num == 0) {
        return false;
    } else {
        return true;
    }
}

create_query(sql);