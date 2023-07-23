const index = require('./index.js');

const databaseConfig = {
    host: "localhost",
    user: "root",
    password: "AvishayDEV19", // change password here
    port: 3306,
    //database: 'HomeMarketDB'
};

async function printTable(tableName){
    const error = await index.getTable(tableName)
    console.log(error);
}

async function run(){
    let error = await index.connect(databaseConfig);
    console.log(error);
    if (error.error) return;

    error = await index.createDatabase('HomeMarketDB');
    console.log(error);
    if (error.error) return;


    // Create Items Table
    error = await index.createTable('items',{'id':'INT', 'imageId':'INT', 'price':'INT', 'title':'VARCHAR(80)',
                                    'status':'VARCHAR(20)','description':'VARCHAR(400)', 'category':'VARCHAR(50)',
                                    'uploadDate':'DATETIME', 'userId':'INT'});
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'id':'INT'},['AUTO_INCREMENT','PRIMARY KEY']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'imageId':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'price':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'title':'VARCHAR(80)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'status':'VARCHAR(20)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'category':'VARCHAR(50)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'uploadDate':'DATETIME'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('items',{'userId':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);


    // Create table Images
    error = await index.createTable('images',{'id':'INT', 'itemId':'INT','imageUrl':'TEXT'});
    if (error.error) return console.log(error);

    error = await index.modifyColumn('images',{'id':'INT'},['AUTO_INCREMENT','PRIMARY KEY']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('images',{'itemId':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('images',{'imageUrl':'TEXT'},['NOT NULL']);
    if (error.error) return console.log(error);

    // Create table Messages
    error = await index.createTable('messages',{'id':'INT', 'text':'TEXT','imageUrl':'TEXT','sendDate':'DATETIME','discussionId':'INT'});
    if (error.error) return console.log(error);

    error = await index.modifyColumn('messages',{'id':'INT'},['AUTO_INCREMENT','PRIMARY KEY']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('messages',{'sendDate':'DATETIME'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('messages',{'discussionId':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);


    // Create table Discussion
    error = await index.createTable('discussions',{'id':'INT', 'userId1':'INT','userId2':'INT'});
    if (error.error) return console.log(error);

    error = await index.modifyColumn('discussions',{'id':'INT'},['AUTO_INCREMENT','PRIMARY KEY']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('discussions',{'userId1':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('discussions',{'userId2':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);


    // Create table Users
    error = await index.createTable('users',{'id':'INT', 'name':'VARCHAR(50)','phone':'VARCHAR(20)',
                                    'email':'VARCHAR(50)','address':'VARCHAR(80)'});
    if (error.error) return console.log(error);

    error = await index.modifyColumn('users',{'id':'INT'},['AUTO_INCREMENT','PRIMARY KEY']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('users',{'name':'VARCHAR(50)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('users',{'phone':'VARCHAR(20)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('users',{'email':'VARCHAR(50)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('users',{'address':'VARCHAR(80)'},['NOT NULL']);
    if (error.error) return console.log(error);

    // Create Table UsersMetadata
    error = await index.createTable('usersMetadata',{'id':'INT', 'userId':'INT','username':'VARCHAR(20)',
                                    'password':'VARCHAR(20)','apiKey':'VARCHAR(20)','userRank':'VARCHAR(20)'});
    if (error.error) return console.log(error);

    error = await index.modifyColumn('usersMetadata',{'id':'INT'},['AUTO_INCREMENT','PRIMARY KEY']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('usersMetadata',{'userId':'INT'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('usersMetadata',{'username':'VARCHAR(20)'},['UNIQUE', 'NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('usersMetadata',{'password':'VARCHAR(20)'},['NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('usersMetadata',{'apiKey':'VARCHAR(20)'},['UNIQUE','NOT NULL']);
    if (error.error) return console.log(error);

    error = await index.modifyColumn('usersMetadata',{'userRank':'VARCHAR(20)'},['NOT NULL']);
    if (error.error) return console.log(error);


    // cREATE fORGIEN Keys
    error = await index.addForeignKey('itemsImages','items','imageId','images','id')
    if (error.error) return console.log(error);

    error = await index.addForeignKey('itemsUsers','items','userId','users','id')
    if (error.error) return console.log(error);

    error = await index.addForeignKey('imagesItems','images','itemId','items','id')
    if (error.error) return console.log(error);

    error = await index.addForeignKey('messagesDiscussions','messages','discussionId','discussions','id')
    if (error.error) return console.log(error);

    error = await index.addForeignKey('discussionsUsers1','discussions','userId1','users','id')
    if (error.error) return console.log(error);

    error = await index.addForeignKey('discussionsUsers2','discussions','userId2','users','id')
    if (error.error) return console.log(error);

    error = await index.addForeignKey('usersMetadataUsers','usersMetadata','userId','users','id')
    if (error.error) return console.log(error);
}
run();