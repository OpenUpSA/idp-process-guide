const todayBtnClsName = '.today-marker';

let calendarStartDate = null;
let calendarEndDate = null;
let phaseOpen = false;
let currentDatePhase = 1;
let openPhaseId = 0;

export class Marker {
    constructor() {
        this.setDomElements();

        this.setCurrentDatePhase();
        this.setMarkerStartPositions();
    }

    setDomElements = () => {
        let self = this;
        $('.phase').each(function () {
            $(this).on('click', () => {
                self.phaseClicked(this);
            })
        });

        $('.reset').on('click', function (e) {
            self.phaseCloseClicked();
        });

        $('.reset-button').on('click', function () {
            self.phaseCloseClicked();
        });
    }

    phaseCloseClicked = () => {
        if (phaseOpen) {
            phaseOpen = false;
            this.phaseClosed();
        }
    }

    setCurrentDatePhase = () => {
        currentDatePhase = this.getPhaseIdOfDate(new Date());
    }

    getPhaseIdOfDate = (date) => {
        let self = this;
        let id = 1;

        $('.phase').each(function () {
            let phaseStart = self.convertStringToDate($(this).attr('data-start'));
            let phaseEnd = self.convertStringToDate($(this).attr('data-end'));
            phaseEnd = self.addDays(phaseEnd, 1);    //take 1 day after so 31st of march is still q3

            if (phaseStart < date && date < phaseEnd) {
                id = self.getPhaseId(this);
            }
        });

        return id;
    }

    addDays = (date, dayCount) => {
        return new Date(date.getTime() + dayCount * 24 * 60 * 60 * 1000);
    }

    setMarkerStartPositions = () => {
        this.setCalendarStartDate();
        this.setCalendarEndDate();
        this.setTodayBtnPosition();
        this.setMarkerPositions();
    }

    phaseClicked = (phaseObj) => {
        let phaseId = this.getPhaseId(phaseObj);
        if (phaseOpen && phaseId === openPhaseId) {
            return;
        }
        phaseOpen = true;
        openPhaseId = phaseId;

        setTimeout(() => {
            this.setPhaseMarkerPositions(phaseId, phaseObj);
            this.setPhaseTodayBtnPosition(phaseObj);
        }, 750)
    }

    getPhaseId = (phaseObj) => {
        let phaseId = 0;
        let phaseClassList = $(phaseObj).attr('class').split(/\s+/);
        phaseClassList.forEach((cls) => {
            if (cls.substr(0, 1) === '_') {
                phaseId = parseInt(cls.replace('_', ''));
            }
        })

        return phaseId;
    }

    setPhaseMarkerPositions = (phaseId, phaseObj) => {
        let self = this;

        $('.markers .q' + phaseId).each(function () {
            let leftOffset = self.calculateDateLeftOffset(phaseObj, this);
            $(this).css('transition-duration', '0.5s');
            self.setObjLeftPosition(this, leftOffset, 'px');
        });
    }

    setPhaseTodayBtnPosition = (phaseObj) => {
        let todaysPhase = $('.phase._' + currentDatePhase)[0];
        $(todayBtnClsName).css('transition-duration', '0.5s');
        let leftOffset = this.calculateDateLeftOffset(todaysPhase, null, true);

        this.setObjLeftPosition(todayBtnClsName, leftOffset, 'px');
    }

    phaseClosed = () => {
        this.setMarkerStartPositions();
        $(todayBtnClsName).show();
    }

    setCalendarStartDate = () => {
        let self = this;
        $('.phase').each(function () {
            let dateStr = $(this).attr('data-start');
            let date = self.convertStringToDate(dateStr);

            if (calendarStartDate === null || date < calendarStartDate) {
                calendarStartDate = date;
            }
        });
    }

    setCalendarEndDate = () => {
        let self = this;
        $('.phase').each(function () {
            let dateStr = $(this).attr('data-end');
            let date = self.convertStringToDate(dateStr);

            if (calendarEndDate === null || date > calendarEndDate) {
                calendarEndDate = date;
            }
        });
    }

    convertStringToDate = (str) => {
        let day = str.substr(0, 2);
        let month = str.substr(2, 2) - 1;   //javascript months are in [0,11]
        let year = str.substr(4, 4);

        let date = new Date(year, month, day);

        return date;
    }

    setTodayBtnPosition = () => {
        let date = new Date();

        let percentage = 0;
        if (!phaseOpen) {
            percentage = this.calculateDatePercentage(date);
        } else {
            percentage = 90;
        }
        this.setObjLeftPosition(todayBtnClsName, percentage);
    }

    setMarkerPositions = () => {
        let self = this;
        $('.event-marker').each(function () {
            let dateStr = $(this).attr('data-date');
            let date = self.convertStringToDate(dateStr);
            let percentage = self.calculateDatePercentage(date);

            self.setObjLeftPosition(this, percentage);
        });
    }

    calculateDatePercentage = (date, periodStart = calendarStartDate, periodEnd = calendarEndDate) => {
        let percentage = 0;
        periodEnd = this.addDays(periodEnd, 1);
        percentage = ((date - periodStart) / (periodEnd - periodStart)) * 100;

        return percentage;
    }

    calculateDateLeftOffset = (phaseObj, marker, isTodayBtn = false) => {
        let startOffset = $(phaseObj).offset().left - $('.year').offset().left;
        let totalWidth = $(phaseObj).width();    // (* percentage) + startOffset
        let periodStart = this.convertStringToDate($(phaseObj).attr('data-start'));
        let periodEnd = this.convertStringToDate($(phaseObj).attr('data-end'));
        let markerDate;
        if (isTodayBtn) {
            markerDate = new Date();
        } else {
            markerDate = this.convertStringToDate($(marker).attr('data-date'));
        }
        let percentage = this.calculateDatePercentage(markerDate, periodStart, periodEnd);
        let offset = (totalWidth * percentage / 100) + startOffset;

        return offset;
    }

    setObjLeftPosition = (obj, offset, unit = '%') => {
        $(obj).css('left', offset + unit);
    }
}
