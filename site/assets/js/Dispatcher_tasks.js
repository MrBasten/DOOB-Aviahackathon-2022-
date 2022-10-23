class Dispatcher_tasks {

    handleSetLocationStorage(element, id) {
        const { pushTasks, tasks } = localStorageUtil.putTasks(id);
        if (pushTasks) {
            element.classList.add(this.className);
        }
    }

    render(filteredCatalog = [...CATALOG]) {
        let htmlCatalog = '';

        filteredCatalog.forEach(({ id, time_start, time_finish, status, capacity, name }) => {

            htmlCatalog += `
                <li class="tasks-element">
                    <span class="tasks-element__name">Имя водителя: ${name}</span>
                    <span class="tasks-element__id">Номер автобуса: ${id}</span>
                    <span class="tasks-element__status">Статус: ${status}</span>
                    <span class="tasks-element__capacity">Вместимость: ${capacity}</span>
                    <time class="tasks-element__time-start">Время начала задания: ${time_start}</time>
                    <time class="tasks-element__time-finish">Время завершения задания: ${time_finish}</time>
                    <button class="tasks-element__button">Назначить маршрут</button>
                    <button class="tasks-element__button" onclick="this.parentElement.style.display='none';">Отменить</button>
                </li>
            `;
        });

        const html = `
            <ul class="tasks-container">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_TASKS.innerHTML = html;
    }
}

const tasksPage = new Dispatcher_tasks();
tasksPage.render();