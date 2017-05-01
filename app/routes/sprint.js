var Sprint = require('../models/sprint');
var config = require('../../config/database');

module.exports = function (apiRoutes) {

  //get all sprints
  apiRoutes.get('/projects/:project_id/sprints', function (req, res) {

    Sprint.find({projectID: req.params.project_id}, function (err, sprints) {
      if(err){
        res.json({success: false, msg: "Error in getting sprints", error: err.message});
      }else{
        res.json({success: true, msg: sprints});
      }
    })

  });

  //get one sprint
  apiRoutes.get('/projects/:project_id/sprints/:sprint_id', function (req, res) {

    Sprint.findOne({_id: req.params.sprint_id,  projectID: req.params.project_id}, function (err, sprint) {
      if(err){
        res.json({success: false, msg: "Error in getting sprint", error: err.message});
      }else{
        res.json({success: true, msg: sprint});
      }
    })

  });

  //create new sprint
  apiRoutes.post('/projects/:project_id/sprints', function (req, res) {

    var newSprint = new Sprint({
      name: req.body.name,
      description: req.body.description,
      finishDate: req.body.finishDate,
      projectID: req.params.project_id
    });

    newSprint.save(function (err) {
      if(err){
        res.json({success: false, msg: 'Project has not been added'});
      }else {
        res.json({success: true, msg: 'Project has been successfully added'});
      }
    });

  });

  //delete sprint
  apiRoutes.delete('/projects/:project_id/sprints/:sprint_id', function (req, res) {

    Sprint.findOneAndRemove({_id: req.params.sprint_id}, function (err) {
      if(err){
        res.json({success: false, msg: "Sprint has not been deleted", error: err.message});
      }else{
        res.json({success: true, msg: "Project has been successfully deleted"});
      }
    });

  });

  //edit sprint
  apiRoutes.put('/projects/:project_id/sprints/:sprint_id', function (req, res) {

    Sprint.findOneAndUpdate(
      {
        _id: req.params.sprint_id,
        projectID: req.params.project_id
      },
      {
        name: req.body.name,
        description: req.body.description,
        finishDate:req.body.finishDate,
        isFinished:req.body.isFinished
      } ,function (err) {
      if(err){
        res.json({success: false, msg: 'Sprint has not been updated', error: err.message});
      }
      else{
        res.json({success: true, msg: 'This sprint has been successfully updated'});
      }
    });

  });

};