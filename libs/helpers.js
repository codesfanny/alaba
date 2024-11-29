const h = (conditional, returnValue, nullValue)  => {
    if (conditional) {
	return returnValue
    }

    if (nullValue === "undefined") {
	return null
    }

    return nullValue;
}

export {h};
