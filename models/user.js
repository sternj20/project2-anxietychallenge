module.exports=function(sequelize, Datatypes){
	var User = sequelize.define("User", {
		name: Datatypes.STRING,
		google_id: Datatypes.STRING,
		email: Datatypes.STRING,
		imageURL: Datatypes.STRING
	});
	return User;
};