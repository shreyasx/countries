export const getList = array => {
	var line = "";
	for (var i = 0; i < array.length; i++) {
		line += array[i];
		if (i !== array.length - 1) line += ", ";
	}
	return line;
};

export const shuffleArray = array => {
	var currentIndex = array.length,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
};
