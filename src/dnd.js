/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    function getRandom() {
        return Math.random() * Math.random() * 100;
    }

    var mydiv = document.createElement('div');

    mydiv.style.width = `${getRandom()}px`;
    mydiv.style.height = `${getRandom()}px`;
    mydiv.style.top = `${getRandom()}px`;
    mydiv.style.left = `${getRandom()}px`;
    mydiv.style.backgroundColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    mydiv.style.position = 'absolute';

    mydiv.setAttribute('draggable', 'true');
    mydiv.classList.add('draggable-div');
    return mydiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    var dropX = 0;
    var dropY = 0;

    target.addEventListener('dragstart', e => {
        target.setAttribute('dragged', '');
        dropX = e.clientX - mydiv.getBoundingClientRect().left;
        dropY = e.clientY - mydiv.getBoundingClientRect().top;
        e.dataTransfer.setData(dropX, `${dropX}`);
        e.dataTransfer.setData(dropY, `${dropY}`);
    });

    document.addEventListener('dragover', e => {
        e.preventDefault();
    });

    document.addEventListener('drop', e => {
        var targetDiv = document.querySelector('[dragged]');
        targetDiv.style.left = `${e.clientX - e.dataTransfer.getData('dropX')}px`;
        targetDiv.style.top = `${e.clientY - e.dataTransfer.getData('dropY')}px`;
        targetDiv.removeAttribute('dragged');
    });

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};