import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryPaymentOptionsRepository } from "../../repositories/InMemoryPaymentOptionsRepository";
import { UpdatePaymentOptionUseCase } from "./UpdatePaymentOptionUseCase";

let inMemoryPaymentOptionsRepository: InMemoryPaymentOptionsRepository;
let updatePaymentOptionUseCase: UpdatePaymentOptionUseCase;

describe("Update payment options", () => {
  beforeEach(() => {
    inMemoryPaymentOptionsRepository = new InMemoryPaymentOptionsRepository();
    updatePaymentOptionUseCase = new UpdatePaymentOptionUseCase(
      inMemoryPaymentOptionsRepository
    );
  });

  it("should be able to update a payment option", async () => {
    const paymentOption = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOption);

    await updatePaymentOptionUseCase.execute({
      id: String(inMemoryPaymentOptionsRepository.repository[0].id),
      type: "debit_card",
    });

    expect(inMemoryPaymentOptionsRepository.repository[0].type).toBe(
      "debit_card"
    );
  });

  it("should not be able to update a payment option when already exists the same type", async () => {
    const paymentOptionOne = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionOne);

    const paymentOptionTwo = new PaymentOption("debit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionTwo);

    expect(async () => {
      return await updatePaymentOptionUseCase.execute({
        id: String(inMemoryPaymentOptionsRepository.repository[0].id),
        type: "debit_card",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should be able to update a payment option wich already has the same type", async () => {
    const paymentOptionOne = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionOne);

    const paymentOptionTwo = new PaymentOption("debit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionTwo);

    await updatePaymentOptionUseCase.execute({
      id: String(inMemoryPaymentOptionsRepository.repository[0].id),
      type: "credit_card",
    });

    expect(inMemoryPaymentOptionsRepository.repository[0].type).toBe(
      "credit_card"
    );
  });

  it("should not be able to update a invalid payment option wich does not exists", async () => {
    const paymentOptionOne = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionOne);

    expect(async () => {
      return await updatePaymentOptionUseCase.execute({
        id: "invalid-uuid",
        type: "credit_card",
      });
    }).rejects.toThrow(NotFoundException);
  });
});
