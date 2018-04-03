var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://poolUser:poolUser@ds245357.mlab.com:45357/pooling_module',['users','activeRides']);

// function getNextSequenceValue(sequenceOfName){

//     var sequenceDoc = db.counter.findAndModify({
//        query:{_id: sequenceOfName },
//        update: {$inc:{sequence_value:1}},
//        new:true
//     },function(err,docs){
//         if(err){
//             console.log(err);
//         }});
//     console.log("this is the generated user id");
//     console.log(sequenceDoc);

//     return sequenceDoc.sequence_value;
//  }

//Get all users
router.get('/users',function(req,res,next){
    db.users.find(function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

//Get one user based on userid
router.get('/user/:userid',function(req,res,next){
    console.log(req.params.userid);
    let userId =  String(req.params.userid);
    db.users.find({"login.login_id": userId},function(err,docs){
        if(err){
            res.send(err);
        }
        // console.log(docs);
        res.json(docs);
    });
});

//Get one user based on employeeid
router.get('/useremp/:empid',function(req,res,next){
    console.log(req.params.empid);
    let empId =  Number(req.params.empid);
    db.users.find({user_id: empId},function(err,docs){
        if(err){
            res.send(err);
        }
        // console.log(docs);
        res.json(docs);
    });
});

//register or add user
router.post('/user',function(req,res){
    let user = req.body;
    // console.log(user);
    // console.log(getNextSequenceValue("userid"));
    // console.log(user);
    db.users.save(user, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//add user id
router.put('/userUpdate/:loginid',function(req,res,next){
    let loginId = Number(req.params.loginid);
    console.log(loginId);
    var user = req.body;
    db.user.findAndModify({query: {"login.login_id": loginId}, update: {$set : {user_id : getNextSequenceValue("userid")}},new: true},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });

});


//delete user
router.delete('/user/:id',function(req,res,next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});


//Get all Rides
router.get('/rides',function(req,res,next){
    db.activeRides.find(function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

//Get single ride
router.get('/ride/:id',function(req,res,next){
    console.log(req.params.id);
    let rideId = Number(req.params.id);
    db.activeRides.find({id : rideId},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

//delete a ride
router.delete('/ride/:id',function(req,res,next){
    db.activeRides.remove({_id: mongojs.ObjectId(req.params.id)},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

//create a ride
router.post('/ride',function(req,res){
    let ride = req.body;
    db.activeRides.save(ride, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(ride);
    });
});

//update seat counts for ride
router.put('/countUpdate/:id',function(req,res,next){
    let rideId = Number(req.params.id);
    var ride = req.body;
    var updRide = ride;
    console.log(updRide);
    console.log("Put command");
    console.log(rideId);
    console.log(updRide.free_seats);
    db.activeRides.findAndModify({query:{id: rideId},update:{$set : {free_seats: updRide.free_seats}},new : true},function(err,docs){
        if(err){
            res.send(err);
        }
        console.log(docs);
        res.json(docs);
    });

});


module.exports = router;
