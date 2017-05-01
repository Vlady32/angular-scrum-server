var Item = require('../models/item');
var config = require('../../config/database');
var async = require('async');

module.exports = function (apiRoutes) {

  //get all items of backlog or sprint
  apiRoutes.get('/projects/:project_id/sprints/:sprint_id/items', function (req, res) {

    if(req.params.sprint_id === 'backlog'){
      Item.find({projectID: req.params.project_id, isBacklog: true}, function (err, items) {
        if (err) {
          res.json({success: false, msg: "Error in getting items", error: err.message});
        } else {
          res.json({success: true, msg: items});
        }
      });
    }else{

      async.waterfall([
        function (callback) {
          Item.find({projectID: req.params.project_id, isBacklog: true},function (err, backlogItems) {
            callback(err, backlogItems);
          })
        },
        function (backlogItems, callback) {
          Item.find({projectID: req.params.project_id, sprintID:req.params.sprint_id},function (err, sprintItems) {
            callback(err, backlogItems.concat(sprintItems));
          })
        }
      ], function (err, items) {
        if(err){
          res.json({success: false, msg: "Error in getting items", error: err.message});
        }else{
          res.json({success: true, msg: items});
        }
      });
    }

  });

  //get one item of backlog or sprint
  apiRoutes.get('/projects/:project_id/sprints/:sprint_id/items/:item_id', function (req, res) {

    Item.findOne({_id: req.params.item_id,  projectID: req.params.project_id}, function (err, item) {
      if(err){
        res.json({success: false, msg: "Error in getting item", error: err.message});
      }else{
        res.json({success: true, msg: item});
      }
    })

  });

  //create new item of backlog or sprint
  apiRoutes.post('/projects/:project_id/sprints/:sprint_id/items', function (req, res) {

    var newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      priority: req.body.priority,
      sprintID: (req.params.sprint_id === 'backlog') ? undefined : req.params.sprint_id,
      storyPoints: req.body.storyPoints,
      status: req.body.status,
      projectID: req.params.project_id,
      isBacklog: req.body.isBacklog
    });

    newItem.save(function (err) {
      if(err){
        console.log(err);
        res.json({success: false, msg: 'Item of backlog has not been created',error: err.message});
      }else {
        res.json({success: true, msg: 'Item of backlog has been successfully created'});
      }
    });

  });

  //delete item
  apiRoutes.delete('/projects/:project_id/sprints/:sprint_id/items/:item_id', function (req, res) {

    Item.findOneAndRemove({projectID: req.params.project_id,_id: req.params.item_id}, function (err) {
      if(err){
        res.json({success: false, msg: "Item has not been deleted", error: err.message});
      }else{
        res.json({success: true, msg: "Item has been successfully deleted"});
      }
    });

  });

  //edit item
  apiRoutes.put('/projects/:project_id/sprints/:sprint_id/items/:item_id', function (req, res) {

    Item.findOneAndUpdate(
      {
        _id: req.params.item_id,
        projectID: req.params.project_id
      },
      {
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        isBacklog: (req.params.sprint_id == 'backlog') ? true : req.body.isBacklog,
        sprintID: (req.params.sprint_id == 'backlog') ? undefined : req.params.sprint_id,
        storyPoints: (req.body.storyPoints === undefined) ? 0 : req.body.storyPoints,
        status: (req.body.status === undefined) ? 1 : req.body.status,
        projectID: req.params.project_id
      } ,function (err) {
      if(err){
        res.json({success: false, msg: 'Item has not been updated', error: err.message});
      }
      else{
        res.json({success: true, msg: 'Item has been successfully updated'});
      }
    });

  });

};