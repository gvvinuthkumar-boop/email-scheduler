const cron = require("node-cron");
const email = require("../model/email");
const sendMail = require("../services/mailservice");

cron.schedule("* * * * *",async()=>{
    const now = new Date();

    const emails =await email.find({
        scheduledAt:{$lte:now},
        status:"scheduled"
    });
    for(let email of emails){
        try{
            await sendMail(email);
            email.status="sent";
        }
        catch(err){
            email.status="failed";
        }
        await email.save();
    }
});