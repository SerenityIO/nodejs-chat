let clients = []

exports.subscribe = res => {
    console.log('subscribe');
          
    clients.push(res)
    
    res.on('close', () => {
        clients.splice(clients.indexOf(res), 1)
    })
}

exports.publish = message => {
    console.error(message);
    clients.forEach(res => {
        res.end(message)        
    })
}