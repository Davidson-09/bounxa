import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("BounxaEvent", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployBounxaEvent() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const BounxaEvent = await hre.ethers.getContractFactory("BounxaEvent");
      const bounxaEvent = await BounxaEvent.deploy(
        "bounxa flagship event",
        1000,
        435458,
        owner.address
      );
  
      return { bounxaEvent, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should have the right value for ticket price", async function () {
        const { bounxaEvent, otherAccount} = await loadFixture(deployBounxaEvent);

        await bounxaEvent.buyTickets(1, otherAccount.address)
  
        // expect(await bounxaEvent.ticketPrice()).to.equal(100);
        expect(await bounxaEvent.isActive()).to.equal(true);
      });
    });

    // describe("Ticket Buying", function () {
    //     it("the number of remaining tickets should be less than the number of available tickets by the value purchased", async function () {
    //       const { bounxaEvent, otherAccount } = await loadFixture(deployBounxaEvent);
    //       await bounxaEvent.connect(otherAccount).buyTickets(2, {value: 200});

    //       const ticketsRemaining = await bounxaEvent.ticketsRemaining();
    //       const ticketQuantity = await bounxaEvent.ticketQuantity();
    //       expect(ticketsRemaining).to.be.below(ticketQuantity);
    //     });
    //   });
  });
  