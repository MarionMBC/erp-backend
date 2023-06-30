export const err400 = (res, msg) => {
    return res.status(400).json({
        msg
    })
}

export const succes200 = (res, msg) => {
    return res.status(200).json({
        msg
    })
}

export const err500 = (msg) => {
    return {msg}
}
