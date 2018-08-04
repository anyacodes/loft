/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i ++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arr = [];

    for (var i = 0; i < array.length; i ++) {
        arr.push(fn(array[i], i, array));
    }
    
    return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    if (initial === undefined) {
        var prev = array[0];
    } else {
        prev = fn(initial, array[0], 0, array);
    }

    for (var i = 1; i < array.length; i++) {
        prev = fn(prev, array[i], i, array);
    }

    return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var arr = [];
    var objectKeys = Object.keys(obj);

    objectKeys.forEach(element => {
        arr.push(element.toUpperCase());
    });

    return arr;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let out = [];

    if ((from === undefined && to === undefined) || (arguments.length === 2 && arguments[1] <= 0)) {
        return array;
    }

    if (from === 0 && to === 0) {
        return [];
    }

    //  tail
    if (arguments.length === 2 && arguments[1] > 0) {
        let out = [];

        for (let i = arguments[1]; i < array.length; i++) {
            out.push(array[i]);
        }

        return out;
    }

    // negative to
    if (from >= 0 && to < 0) {
        to = array.length + to;

        for (let i = from; i < to; i++) {
            out.push(array[i]);
        }

        return out;
    }

    // both positive
    if (from >= 0 && to > 0) {

        if (to > array.length) {
            to = array.length;
        }

        for (let i = from; i < to; i++) {
            out.push(array[i]);
        }

        return out;
    }

    // negative from
    if (from < 0 && to > 0) {
        if (Math.abs(from) < array.length) {
            from = array.length + from
        } else {
            from = 0;
        }

        for (let i = from; i < to; i++) {
            out.push(array[i]);
        }

        return out;
    }

    // both negative
    if (from < 0 && to < 0) {

        if (Math.abs(from) < array.length) {
            from = array.length + from
        } else {
            from = 0;
        }

        to = array.length + to;

        for (let i = from; i < to; i++) {
            out.push(array[i]);
        }

        return out;
    }

}
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        get(target, propKey) {
            return Math.pow(obj[propKey], 2);
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};