import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryPaymentOptionsRepository } from "../../repositories/InMemoryPaymentOptionsRepository";
import { ListPaymentOptionUseCase } from "./ListPaymentOptionUseCase";

let inMemoryPaymentOptionsRepository: InMemoryPaymentOptionsRepository;
let listPaymentOptionUseCase: ListPaymentOptionUseCase;

describe("List payment options", () => {
  beforeEach(() => {
    inMemoryPaymentOptionsRepository = new InMemoryPaymentOptionsRepository();
    listPaymentOptionUseCase = new ListPaymentOptionUseCase(
      inMemoryPaymentOptionsRepository
    );
  });

  it("should be able to list all payment options", async () => {
    const paymentOptionOne = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionOne);

    const paymentOptionTwo = new PaymentOption("debit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionTwo);

    const paymentOptionThree = new PaymentOption("pix");
    await inMemoryPaymentOptionsRepository.create(paymentOptionThree);

    const paymentOptions = await listPaymentOptionUseCase.execute();
    expect(paymentOptions.length).toBe(3);
  });
});
