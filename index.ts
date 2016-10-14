import Datastore = require('nedb');
import { AsyncNeDBDataStore } from './nedb_async';

var db = new AsyncNeDBDataStore({
    filename: 'data/database.db'
});

var doc = [
    { name: "hoge", age: 20 },
    { name: "hoge1", age: 25 },
    { name: "hoge2", age: 30 },
    { name: "foo", age: 18 },
    { name: "ほげ", age: 40 },
    { name: "ほげほげ", age: 50 },
];

async function main() {
    await db.loadDatabaseAsync();

    // 初期データの書き込み
    await db.insertAsync(doc);

    // 全件表示
    var allItems = await db.findAsync({});
    console.log("■全件表示");
    console.dir(allItems);

    // findでの検索
    var searchResult1 = await db.findAsync({ name: "hoge2" });
    console.log("■findでの検索");
    console.dir(searchResult1);

    var searchResult2 = await db.findAsync({ age: { $gte: 30 } });
    console.log("■検索結果2(ageが30以上の項目を抽出)");
    console.dir(searchResult2);

    // updateで要素の更新
    await db.updateAsync({ name: "ほげ" }, { $set: { age: 45 } }, { multi: true });

    // removeで要素の削除
    await db.removeAsync({ name: "ほげほげ" }, {});

    // 結果表示
    var result = await db.findAsync({});
    console.log("■結果");
    console.dir(result);
}

main();
