


/*
INSERT INTO car_renters (carId, email)
VALUES (3, "john.doe@doecompany.com");

INSERT INTO car_renters (carId, email)
VALUES (1, "sarah.doe@doecompany.com");

INSERT INTO car_renters (carId, email)
VALUES (2, "david.doe@doecompany.com");
*/
db.car_renters.insertMany([
    {
        email: "john.doe@doecompany.com"
    },
    {
        email: "sarah.doe@doecompany.com"
    },
    {
        email: "david.doe@doecompany.com"
    },
]);

/*INSERT INTO cars (brand, tank_percentage) VALUES ("Volvo", 50);
INSERT INTO cars (brand, tank_percentage) VALUES ("Saab", 100);
INSERT INTO cars (brand, tank_percentage) VALUES ("Nissan", 70);
INSERT INTO cars (brand, tank_percentage) VALUES ("Toyota", 30);
INSERT INTO cars (brand, tank_percentage) VALUES ("Toyota", 60);
INSERT INTO cars (brand, tank_percentage) VALUES ("Toyota", 60);
INSERT INTO cars (brand, tank_percentage) VALUES ("Hondai", 60);*/

/*
    > db.car_renters.find().pretty()
{
        "_id" : ObjectId("602cdd852914297456233efa"),
        "email" : "john.doe@doecompany.com"
}
{
        "_id" : ObjectId("602cdd852914297456233efb"),
        "email" : "sarah.doe@doecompany.com"
}
{
        "_id" : ObjectId("602cdd852914297456233efc"),
        "email" : "david.doe@doecompany.com"
}

*/
db.cars.insertMany([
    {
        brand: "Volvo",
        tank_percentage: 50,
        renter: {
            $ref: "car_renters",
            $id: ObjectId("602cdd852914297456233efa"),
        }
    },
    {
        brand: "Saab",
        tank_percentage: 100,
        renter: {
            $ref: "car_renters",
            $id: ObjectId("602cdd852914297456233efa"),
        }
    },
    {
        brand: "Nissan",
        tank_percentage: 70,
        renter: {
            $ref: "car_renters",
            $id: ObjectId("602cdd852914297456233efb"),
        }
    },
    {
        brand: "Toyota",
        tank_percentage: 30,
        renter: {
            $ref: "car_renters",
            $id: ObjectId("602cdd852914297456233efc"),
        }
    },
    {
        brand: "Toyota",
        tank_percentage: 60,
    },
    {
        brand: "Hondai",
        tank_percentage: 60,
    }
]);

db.cars.aggregate({
    $lookup: {
        from: "car_renters",
        localField: "renter.$id",
        foreignField: "_id",
        as: "renter"
    }
}).pretty();


db.cars.find({ tank_percentage: { $gt: 50 } });
db.cars.find({ tank_percentage: { $gte: 50 } });

db.cars.find({ tank_percentage: { $lt: 60 } });
db.cars.find({ tank_percentage: { $lte: 60 } });

db.cars.find({ $or: [{tank_percentage: 60}, { tank_percentage: 50 }] });

db.cars.find({ $or: [{tank_percentage: 60}, { tank_percentage: 50 }], brand: "Hondai" });


const fileContents = cat("cars.json");
const jsonArray = JSON.parse(fileContents);
db.cars.insertMany(jsonArray);