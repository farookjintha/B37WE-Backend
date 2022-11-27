exports.isAdmin = (req, res, next) => {
    const admin = req.profile.role === 1;

    if(!admin){
        return res.status(401).send({message: 'Access Denied! Admin Resource. '})
    }

    next();
};

exports.isContentCreator = (req, res, next) => {
    const contentCreator = req.profile.role === 2;

    if(!contentCreator){
        return res.status(401).send({message: 'Access Denied! Content Creator Resource. '})
    }
    
    next();
};