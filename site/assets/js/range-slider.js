const rangeSlider = document.getElementById('range_slider');

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [0, 23],
        connect: true,
        step: 1,
        range: {
            'min': 0,
            'max': 23
        }
    });

    const input0 = document.getElementById('input-0');
    const input1 = document.getElementById('input-1');
    const inputs = [input0, input1];

    rangeSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = Math.round(values[handle]);
        let catalog = filterByTime(input0.value, input1.value);
        tasksPage.render(catalog);
    });

    const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;

        rangeSlider.noUiSlider.set(arr);
    }

    inputs.forEach((el, index) => {
        el.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value);
        });
    });
}