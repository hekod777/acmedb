var express = require ('express');
var router = express.Router();
var client = require('../db/index');
var tempcatid;
var methodOverride = require ('method-override');

router.get('/', function(req,res,next){
	client.query({text: 'select * from categories'},[],function(err,result){
		if (err) return next (err);
		var everything = result.rows;
		var allcats=[];
		everything.forEach(function(item,index){
			allcats.push({category:item.name, id:item.id})
		})
		res.render('index',{title:'all cats', categories: allcats});
		console.log (allcats);
	})
})

router.get('/categories/:id',function(req,res,next){
	var theid = req.params.id *1;
	tempcatid = theid;
	var allproducts = [];
	console.log(req.params.id);
	client.query({text: 'select * from products where category_id = $1', values: [theid] }, function(err,result){
			if (err) return next (err);
			var everything = result.rows;
			everything.forEach(function(item,index){
				allproducts.push({name: item.name, id:item.id})
			});
			res.render('category', {title:'the category', thecategory: allproducts, catid: tempcatid});
	})
});


router.post('/category/:id', function(req,res,next){
	var thename = req.body.name;
	var theid = tempcatid;
	client.query({text:'insert into products(name, category_id) values ($1,$2) returning id', values:[ thename, theid]}, function(err,result){
		if (err) return next (err);
	})
	res.redirect('/categories/' + tempcatid);
})

router.post('/addcat', function(req,res,next){
	var thename = req.body.name;
	client.query({text:'insert into categories (name) values ($1)', values:[thename]}, function(err,result){
		if (err) return next (err);
	})
	res.redirect('/');
})


router.delete('/category/:productid', function(req,res,next){
	var theid = req.params.productid*1;
	client.query({text:'delete from products where id = $1', values:[theid]}, function(err, results){
		if (err) return next (err);
	});
	res.redirect ('/categories/' + tempcatid);
})

router.delete('/categoriesdelete/:catid', function(req,res,next){
	var theid = req.params.catid*1;
	console.log ('doodoo');
	client.query({text:'delete from categories where id = $1', values:[theid]}, function(err, result){
		if (err) return next (err);
	})
	client.query({text:'delete from products where category_id = $1', values:[theid]}, function(err,result){
		if (err) return next (err);
	})
	res.redirect('/');
})

module.exports = router;