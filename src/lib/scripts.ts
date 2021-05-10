export const LISTED_MOMENT_META = `
  import TopShot from 0x0b2a3299cc857e29
  import Market from 0xc1e4f4f4c4257510
  pub struct Moment {
    pub var id: UInt64
    pub var playId: UInt32
    pub var setId: UInt32
    pub var serialNumber: UInt32
    init(moment: &TopShot.NFT) {
      self.id = moment.id
      self.playId = moment.data.playID
      self.setId = moment.data.setID
      self.serialNumber = moment.data.serialNumber
    }
  }

  pub fun main(momentId: UInt64, owner: Address): Moment {
    let acct = getAccount(owner)
    let collectionRef = acct.getCapability(/public/topshotSaleCollection)!.borrow<&{Market.SalePublic}>() ?? panic("Could not borrow capability from public collection")
    let moment = collectionRef.borrowMoment(id: momentId) ?? panic("Could not borrow moment from public collection")
    return Moment(moment: moment)
  }
`;
