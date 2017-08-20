module.exports=function(sequelize, Datatypes){
	var Activity = sequelize.define("Activity", {
		journal_entry: Datatypes.STRING,
	});
	return Activity;
};