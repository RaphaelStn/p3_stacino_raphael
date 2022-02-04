class Stations {
    constructor() {
        this.stations = null;
    }
    async initStations(url) {
        let thisData = new Promise(function(done, fail) {
            $.get(url, function(dataPromise) {
                if (dataPromise) {
                    this.stations = dataPromise;
                    return done(dataPromise);
                }else {
                    return fail(err);
                }
            })
        });
        return thisData;
    }

}
