$(document).ready(function() {
    function generateTimeBlocks() {
        const container = $(".container");
        const currentDay = dayjs().format('dddd, MMMM D, YYYY');
        $("#current-day").text(currentDay);

        for (let i = 9; i <= 17; i++) {
            const hour = dayjs().set('hour', i);
            const isPast = hour.isBefore(dayjs(), 'hour');
            const isPresent = hour.isSame(dayjs(), 'hour');
            const isFuture = hour.isAfter(dayjs(), 'hour');
            const timeBlockClass = isPast ? "past" : (isPresent ? "present" : "future");

            const timeBlock = `
                <div class="row time-block ${timeBlockClass}">
                    <div class="col-2 hour">${hour.format('h A')}</div>
                    <div class="col-8 description">
                        <textarea class="event" id="hour-${i}"></textarea>
                    </div>
                    <div class="col-2 saveBtn">
                        <button class="save" data-hour="${i}">Save</button>
                    </div>
                </div>
            `;

            container.append(timeBlock);
            const savedEvent = localStorage.getItem(`event-${i}`);
            $(`#hour-${i}`).val(savedEvent);
        }
    }

    generateTimeBlocks();

    $(".save").on("click", function() {
        const hour = $(this).data("hour");
        const eventText = $(`#hour-${hour}`).val();
        localStorage.setItem(`event-${hour}`, eventText);
    });
});

