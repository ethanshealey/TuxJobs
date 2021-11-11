
export default class JobObject {
  constructor(id, position, company, location, url, description, type, date) {
    this.id = id;
    this.position = position;
    this.company = company;
    this.location = location;
    this.url = url;
    this.description = description;
    this.type = type;
    this.date = date;
  }
}