const Bus = require('../models/bus')
const Route = require('../models/routes')

const getBusBySrc = async (req, res) => {
    try {
        var src = req.query.src
        var dest = req.query.dest
        var date = req.query.date
        var ac = req.query.ac
        var busType = req.query.busType
        if(ac==undefined && busType==undefined)
        var bus = await Bus.find({ pickdate: date });
        else if(ac==undefined)
        var bus = await Bus.find({ pickdate: date, busType: busType });
        else if(busType==undefined)
        var bus = await Bus.find({ pickdate: date, ac: ac });
        else
        var bus = await Bus.find({ pickdate: date, ac: ac, busType: busType });
        if (bus.length>0) {
            for(let i=0;i<bus.length;i++) {
                if(bus[i].seats>0){
                    var a=[];
                    var temp = JSON.parse(JSON.stringify(bus[i]));
                    console.log(temp.bookings, temp.bookings.length)
                    var totalSeats=0
                    if(temp.busType=='Sleeper 2x1')
                    totalSeats=6*temp.rows
                    else
                    totalSeats=4*temp.rows
                    var percent = (parseFloat(temp.bookings.length)/totalSeats)*100
                    console.log("percent ",percent)
                    var bc = temp.baseCharge
                    if(percent>90)
                    bc+=(bc/5)
                    else if(percent>75)
                    bc+=(15*bc)/100
                    else if(percent>50)
                    bc+=(bc/10)
                    var r = await Route.find({_id:bus[i].routes})
                    var x=r[0]['src']
                    r=r[0]['stops']
                    stops=[x]
                    if(r.length>0) {
                        for(var j=0;j<r.length;j++)
                        stops.push(Object.keys(r[j])[0])
                    }
                    else {
                        stops.push(dest)
                    }
                    if(stops.indexOf(src)>=0 && stops.indexOf(src)<stops.indexOf(dest)) {
                        temp.routes=stops;
                        var start,end,stime,etime;
                        if(x==src) {
                            start=0;
                            stime=0;
                        }
                        else {
                            for(var j=0;j<r.length;j++){
                                if(Object.keys(r[j])[0]==src) {
                                    start=Object.values(r[j])[0][1];
                                    stime=Object.values(r[j])[0][0];
                                    break
                                }
                            }
                        }
                        for(var j=0;j<r.length;j++){
                            if(Object.keys(r[j])[0]==dest) {
                                end=Object.values(r[j])[0][1];
                                etime=Object.values(r[j])[0][0];
                                break
                            }
                        }
                        temp.cost=bc+temp.perKm*(end-start)
                        temp.totaltime=etime-stime
                    }
                    a.push(temp)
                }
            }
            res.status(200).json({
                message: "You have the following buses !",
                status: true,
                data: a,
            });
            return;
        } else {
            res.status(200).json({
              message: "No buses available !",
              status: false,
              data: {},
            });
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message,
            status: false
        });
    }
}


module.exports = {
    getBusBySrc,
};