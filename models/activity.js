module.exports=function(sequelize, Datatypes){
	var Activity = sequelize.define("Activity", {
		user_id: Datatypes.INTEGER,
		question_id: Datatypes.INTEGER,
		journal_entry: Datatypes.STRING,
	});
  Activity.associate = function(models) {
    Activity.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
	return Activity;
};