import connection from '../database/dbconfig.js';
import moment from 'moment/moment.js';
export const saveVisitor = async (req, res) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        connection.query('Insert into visitors(data,timestamp,page) values(?, ?,?)',
            [JSON.stringify(req.body), timestamp, req.params.page],
            (err, rows) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(rows)
            })
    } catch (err) {
        return res.status(500).json({ "msg": "Internal server error", error: err })
    }
}
export const showVisitors = async (req, res) => {
    try {
        connection.query('Select * from Visitors order by timestamp desc', (err, rows) => {
            if (err) {
                throw err;
            }
            var arr = rows.map(e => {
                return { data: JSON.parse(e.data), time: e.timestamp, page: e.page }
            });
            res.status(200).json(arr)
        })

    } catch (err) {
        return res.status(500).json({ "msg": "Internal server error", error: err })
    }
}
export const showCountryData = async (req, res) => {
    try {
        connection.query('Select * from Visitors', (err, rows) => {
            if (err) {
                throw err;
            }
            let countryData = {}
            rows.map(e => {
                return { data: JSON.parse(e.data), time: e.timestamp, page: e.page }
            }).forEach(element => {
                const { countryName } = element.data
                countryName ? countryData[countryName] ? countryData[countryName]++ : countryData[countryName] = 1 : ""
            })
            const totalData = rows.map(e => {
                return { data: JSON.parse(e.data), time: e.timestamp, page: e.page }
            }).length;
            res.status(200).json({ total: totalData, country: countryData })
        })

    } catch (err) {
        return res.status(500).json({ "msg": "Internal server error", error: err })
    }
}
export const oneDayData = async (req, res) => {
    try {
        connection.query('SELECT * FROM visitors WHERE timestamp >= NOW()-INTERVAL 1 DAY ORDER BY timestamp desc;', (err, rows) => {
            if (err) {
                throw err;
            }
            var arr = rows.map(e => {
                return { data: JSON.parse(e.data), time: e.timestamp, page: e.page }
            });
            var data = {
                "homeData": [
                    ...arr.filter(e => {
                        return e.page == "home"
                    })
                ],
                "careerData": [
                    ...arr.filter(e => {
                        return e.page == "career"
                    })
                ],
                "productData": [
                    ...arr.filter(e => {
                        return e.page == "product"
                    })
                ]
            }
            const labels = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            var counts = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
            labels.forEach((ele, index) => {
                // Iterate over homeData
                data.homeData.forEach(entry => {
                    const entryTime = new Date(entry.time);
                    if (entryTime.getMonth() === index) { // index will be Month from Jan-Dec (0-11)
                        counts[0][index]++;
                    }
                });

                // Iterate over careerData
                data.careerData.forEach(entry => {
                    const entryTime = new Date(entry.time);
                    if (entryTime.getMonth() === index) { // index will be Month from Jan-Dec (0-11)
                        counts[1][index]++;
                    }
                });

                // Iterate over productData
                data.productData.forEach(entry => {
                    const entryTime = new Date(entry.time);
                    if (entryTime.getMonth() === index) { // index will be Month from Jan-Dec (0-11)
                        counts[2][index]++;
                    }
                });
            })
            res.status(200).json(data)
        })
    } catch (err) {
        return res.status(500).json({ "msg": "Internal server error", error: err })
    }
}
export const monthlyVisitor = async (req, res) => {
    try {
        connection.query('Select * from Visitors', (err, rows) => {
            if (err) {
                throw err;
            }
            var arr = rows.map(e => {
                return { data: JSON.parse(e.data), time: e.timestamp, page: e.page }
            });
            var data = {
                "homeData": [
                    ...arr.filter(e => {
                        return e.page == "home"
                    })
                ],
                "careerData": [
                    ...arr.filter(e => {
                        return e.page == "career"
                    })
                ],
                "productData": [
                    ...arr.filter(e => {
                        return e.page == "product"
                    })
                ]
            }
            const labels = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            var counts = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
            labels.forEach((ele, index) => {
                // Iterate over homeData
                data.homeData.forEach(entry => {
                    const entryTime = new Date(entry.time);
                    if (entryTime.getMonth() === index) { // index will be Month from Jan-Dec (0-11)
                        counts[0][index]++;
                    }
                });

                // Iterate over careerData
                data.careerData.forEach(entry => {
                    const entryTime = new Date(entry.time);
                    if (entryTime.getMonth() === index) { // index will be Month from Jan-Dec (0-11)
                        counts[1][index]++;
                    }
                });

                // Iterate over productData
                data.productData.forEach(entry => {
                    const entryTime = new Date(entry.time);
                    if (entryTime.getMonth() === index) { // index will be Month from Jan-Dec (0-11)
                        counts[2][index]++;
                    }
                });
            })
            res.status(200).json({ labels: labels, page: ["homeData", "careerData", "productData"], series: counts })
        })
    } catch (err) {
        return res.status(500).json({ "msg": "Internal server error", error: err })
    }
}
/*

labels: [
"9:00AM",
"12:00AM",
"3:00PM",
"6:00PM",
"9:00PM",
"12:00PM",
"3:00AM",
"6:00AM",

]
series: [
[287, 385, 490, 492, 554, 586, 698, 695],
[67, 152, 143, 240, 287, 335, 435, 437],
[23, 113, 67, 108, 190, 239, 307, 308],
]
*/ 