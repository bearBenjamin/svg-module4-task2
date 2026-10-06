const PATHS = {
	smallExpandedD: 'M9,2 L13,2 C14,2 14,2 14,2 C14,2 14,4 14,5.5 L10.0518656,9.56376043 C9.47093627,10.1454132 8.52906373,10.1454132 7.94813439,9.56376043 L4,5.5 C4,4 4,2 4,2 C4,2 4,2 5,2 L9,2 Z',
	largeExpandedD: 'M9,18 L4,18 C4,16.9954032 4,18 4,16.9954032 C4,15.9908065 4,1.0027958 4,1.77635684e-15 L8,1.77635684e-15 C9,3.81014664e-14 9,1.77635684e-15 10,2.45749601e-14 L14,1.77635684e-15 C14,1 14,15.9908065 14,16.9954032 C14,18 14,16.9954032 14,18 L9,18 Z',
	largeInitialD: 'M9,3.59576602 L3.03942822,9.56376043 C2.45849888,10.1454132 1.51662634,10.1454132 0.935697001,9.56376043 C0.354767666,8.98210767 0.354767666,8.03906222 0.935697001,7.45740946 L7.94813439,0.436239569 C8.52906373,-0.14541319 9.47093627,-0.14541319 10.0518656,0.436239569 L17.064303,7.45740946 C17.6452323,8.03906222 17.6452323,8.98210767 17.064303,9.56376043 C16.4833737,10.1454132 15.5415011,10.1454132 14.9605718,9.56376043 L9,3.59576602 Z',
	smallInitialD: 'M9,6.40423398 L14.9605718,0.436239569 C15.5415011,-0.14541319 16.4833737,-0.14541319 17.064303,0.436239569 C17.6452323,1.01789233 17.6452323,1.96093778 17.064303,2.54259054 L10.0518656,9.56376043 C9.47093627,10.1454132 8.52906373,10.1454132 7.94813439,9.56376043 L0.935697001,2.54259054 C0.354767666,1.96093778 0.354767666,1.01789233 0.935697001,0.436239569 C1.51662634,-0.14541319 2.45849888,-0.14541319 3.03942822,0.436239569 L9,6.40423398 Z'
};

const loaderElement = document.querySelector('.loader');
const largeElementPath = document.querySelector('.large-elem path');
const smalElementPath = document.querySelector('.small-elem path');

console.log('largeElementPath: ', largeElementPath);
console.log('smalElementPath: ', smalElementPath);

// Переключатель состояния (false - исходные стрелочки, true - карандаш собран)
let isExpanded = false;

const transformRectForward = KUTE.to(largeElementPath, { path: PATHS.largeExpandedD }, { duration: 600, easing: 'easingCubicInOut' });
const transformTriangleForward = KUTE.to(smalElementPath, { path: PATHS.smallExpandedD }, { duration: 600, easing: 'easingCubicInOut' });

const rotateLargeForward = KUTE.to('.large-elem', { rotate: 45 }, { duration: 600, easing: 'easingCubicInOut' });
const rotateSmallForward = KUTE.to('.small-elem', { rotate: 45, translate: [-10, -4] }, { duration: 600, easing: 'easingCubicInOut' });

transformRectForward.chain(rotateLargeForward);
transformTriangleForward.chain(rotateSmallForward);

const rotateLargeBackward = KUTE.to('.large-elem', { rotate: 0 }, { duration: 600, easing: 'easingCubicInOut' });
const rotateSmallBackward = KUTE.to('.small-elem', { rotate: 0, translate: [0, 0] }, { duration: 600, easing: 'easingCubicInOut' });

const transformRectBackward = KUTE.to(largeElementPath, { path: PATHS.largeInitialD }, { duration: 600, easing: 'easingCubicInOut' });
const transformTriangleBackward = KUTE.to(smalElementPath, { path: PATHS.smallInitialD }, { duration: 600, easing: 'easingCubicInOut' });

rotateLargeBackward.chain(transformRectBackward);
rotateSmallBackward.chain(transformTriangleBackward);

loaderElement.addEventListener('click', () => {
	if (!isExpanded) {
		// Собираем карандаш: запускаем только первый этап (морфинг вперед)
		transformRectForward.start();
		transformTriangleForward.start();
	} else {
		// Разбираем карандаш: запускаем только первый этап обратного пути (разворот назад)
		rotateLargeBackward.start();
		rotateSmallBackward.start();
	}

	// Меняем флаг состояния на противоположный
	isExpanded = !isExpanded;
});
