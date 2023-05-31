import { BadRequestException } from "../../../../errors/BadRequestException";
import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryPaymentOptionsRepository } from "../../repositories/InMemoryPaymentOptionsRepository";
import { CreatePaymentOptionUseCase } from "./CreatePaymentOptionUseCase";

let inMemoryPaymentOptionsRepository: InMemoryPaymentOptionsRepository;
let createPaymentOptionUseCase: CreatePaymentOptionUseCase;

describe("Create payment options", () => {
  beforeEach(() => {
    inMemoryPaymentOptionsRepository = new InMemoryPaymentOptionsRepository();
    createPaymentOptionUseCase = new CreatePaymentOptionUseCase(
      inMemoryPaymentOptionsRepository
    );
  });

  it("should be able to create a new payment option", async () => {
    await createPaymentOptionUseCase.execute("credit_card");
    expect(inMemoryPaymentOptionsRepository.repository[0].id).toBeTruthy();
  });

  it("should not be able to create a new payment option", async () => {
    const paymentOption = new PaymentOption("credit_card");

    inMemoryPaymentOptionsRepository.create(paymentOption);

    expect(async () => {
      return await createPaymentOptionUseCase.execute("credit_card");
    }).rejects.toThrow(BadRequestException);
  });
});
