import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryPaymentOptionsRepository } from "../../repositories/InMemoryPaymentOptionsRepository";
import { DeletePaymentOptionUseCase } from "./DeletePaymentOptionUseCase";

let inMemoryPaymentOptionsRepository: InMemoryPaymentOptionsRepository;
let deletePaymentOptionUseCase: DeletePaymentOptionUseCase;

describe("Delete payment options", () => {
  beforeEach(() => {
    inMemoryPaymentOptionsRepository = new InMemoryPaymentOptionsRepository();
    deletePaymentOptionUseCase = new DeletePaymentOptionUseCase(
      inMemoryPaymentOptionsRepository
    );
  });

  it("should be able to delete a payment option", async () => {
    const paymentOption = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOption);

    await deletePaymentOptionUseCase.execute(
      String(inMemoryPaymentOptionsRepository.repository[0].id)
    );

    expect(inMemoryPaymentOptionsRepository.repository[0].deletedAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to delete a invalid payment option wich does not exists", async () => {
    const paymentOptionOne = new PaymentOption("credit_card");
    await inMemoryPaymentOptionsRepository.create(paymentOptionOne);

    expect(async () => {
      return await deletePaymentOptionUseCase.execute("invalid_uuid");
    }).rejects.toThrow(NotFoundException);
  });
});
