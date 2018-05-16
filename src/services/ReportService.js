import * as moment from "moment";

export default {
  createDailyReports() {
    const reports = [];

    const today = moment().startOf("day");

    for (let i = 0; i < 7; i += 1) {
      const startOfDay = moment()
        .isoWeekday(i + 1)
        .startOf("day");

      const endOfDay = moment(startOfDay).endOf("day");

      const title = `${startOfDay.format("dddd")}`;
      const isActive = startOfDay.isBefore(today);

      const report = this.createReport(title, startOfDay, endOfDay, isActive);
      reports.push(report);
    }

    return reports;
  },
  createWeeklyReports() {
    const reports = [];

    const today = moment();
    const numWeeks = 4;

    for (let i = 0; i < numWeeks; i += 1) {
      const startOfWeek = moment()
        .subtract(i, "weeks")
        .startOf("isoWeek")
        .startOf("day");

      const endOfWeek = moment(startOfWeek)
        .endOf("isoWeek")
        .endOf("day");

      const title = `Week ${startOfWeek.format("W")}`;
      const isActive = startOfWeek.isBefore(today);

      const report = this.createReport(title, startOfWeek, endOfWeek, isActive);
      reports.push(report);
    }

    return reports;
  },
  createMonthlyReports() {
    const reports = [];

    const today = moment();

    for (let i = 0; i < 12; i += 1) {
      const startOfMonth = moment()
        .month(i)
        .startOf("month")
        .startOf("day");

      const endOfMonth = moment(startOfMonth)
        .endOf("month")
        .endOf("day");

      const title = `${startOfMonth.format("MMMM")}`;
      const isActive = startOfMonth.isBefore(today);

      const report = this.createReport(
        title,
        startOfMonth,
        endOfMonth,
        isActive
      );
      reports.push(report);
    }

    return reports;
  },
  createYearlyReports() {
    const reports = [];

    const startOfYear = moment().startOf("year");
    const endOfYear = moment().endOf("year");
    const title = `${startOfYear.format("YYYY")}`;
    const isActive = startOfYear.isBefore(moment());

    const report = this.createReport(title, startOfYear, endOfYear, isActive);
    reports.push(report);

    return reports;
  },
  createReport(title, startDate, endDate, active) {
    const report = {
      title,
      active,
      startDate: startDate.format("D MMM YYYY"),
      startTime: startDate.format("HH:mm"),
      endDate: endDate.format("D MMM YYYY"),
      endTime: endDate.format("HH:mm"),
      coverage: "All States",
      dataTypes: "All"
    };

    return report;
  }
};
