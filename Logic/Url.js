 class Url {
	constructor(dir, shortDir) {
		this.dir = dir;
		this.shortDir = shortDir;
	}
	//normal url
	set setDir(dir) {
		this.dir = dir;
	}
	get getDir() {
		return this.dir;
	}

	//short url
	set setShortDir(shortDir) {
		this.shortDir = shortDir;
	}
	get getShortDir() {
		return this.shortDir;
	}
}


