const cluster = jest.genMockFromModule('cluster');

global.isMaster = true;

Object.defineProperty(cluster, 'isMaster', {
    get: function() {
        return global.isMaster
    }
});

cluster.fork = () => {
    if (global.onFork) global.onFork();
};

module.exports = cluster;