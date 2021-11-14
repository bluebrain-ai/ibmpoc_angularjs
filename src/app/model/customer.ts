export class customer {
  constructor(
    public custNo: number,
    public custFirstName: string,
    public custLastName: string,
    public dateofBirth: Date,
    public houseName: string,
    public houseNumber: string,
    public postCode: string,
    public phoneHome: string,
    public phoneMobile: string,
    public emailAddress: string
  ) {}
}
