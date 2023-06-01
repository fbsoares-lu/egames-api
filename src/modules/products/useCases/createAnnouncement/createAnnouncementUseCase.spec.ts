import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemoryUserRepository } from "../../../accounts/repositories/InMemoryUserRepository";
import { InMemoryFileRepository } from "../../../files/repositories/InMemoryFileRepository";
import { Category } from "../../entities/Category";
import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryAnnouncementRepository } from "../../repositories/InMemoryAnnouncementRepository";
import { InMemoryCategoriesRepository } from "../../repositories/InMemoryCategoriesRepository";
import { InMemoryPaymentOptionsRepository } from "../../repositories/InMemoryPaymentOptionsRepository";
import { CreateAnnouncementUseCase } from "./CreateAnnouncementUseCase";

let inMemoryAnnouncementRepository: InMemoryAnnouncementRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPaymentOptionsRepository: InMemoryPaymentOptionsRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryFileRepository: InMemoryFileRepository;

let createAnnouncementUseCase: CreateAnnouncementUseCase;

describe("Create announcement", () => {
  beforeEach(() => {
    inMemoryAnnouncementRepository = new InMemoryAnnouncementRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryPaymentOptionsRepository = new InMemoryPaymentOptionsRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryFileRepository = new InMemoryFileRepository();

    createAnnouncementUseCase = new CreateAnnouncementUseCase(
      inMemoryAnnouncementRepository,
      inMemoryUserRepository,
      inMemoryCategoriesRepository,
      inMemoryPaymentOptionsRepository,
      inMemoryFileRepository
    );
  });

  it("should be able to create a new announcement", async () => {
    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const categories: string[] = [];
    const categoryOne = new Category("Cars", "Cars description...");
    inMemoryCategoriesRepository.create(categoryOne);
    categories.push(String(inMemoryCategoriesRepository.repository[0].id));

    const categoryTwo = new Category("Automotive", "Automotive description...");
    inMemoryCategoriesRepository.create(categoryTwo);
    categories.push(String(inMemoryCategoriesRepository.repository[1].id));

    const paymentOptions: string[] = [];
    const paymentOption = new PaymentOption("creadit_card");
    inMemoryPaymentOptionsRepository.create(paymentOption);
    paymentOptions.push(
      String(inMemoryPaymentOptionsRepository.repository[0].id)
    );

    const files: string[] = [];
    inMemoryFileRepository.create({
      path: "path",
      originalName: "original.png",
      type: "png",
    });
    files.push(String(inMemoryFileRepository.repository[0].id));

    await createAnnouncementUseCase.execute({
      userId: String(inMemoryUserRepository.repository[0].id),
      announcementName: "Chevrolet Camaro",
      announcementState: "old",
      announcementDescription: "Description...",
      announcementPrice: 200000.0,
      status: true,
      isExchangeable: false,
      categoryIds: categories,
      paymentOptionIds: paymentOptions,
      fileIds: files,
    });

    expect(inMemoryAnnouncementRepository.repository[0].id).toBeTruthy();
  });

  it("should not be able to create a new announcement with invalid user id", async () => {
    const categories: string[] = [];
    const categoryOne = new Category("Cars", "Cars description...");
    inMemoryCategoriesRepository.create(categoryOne);
    categories.push(String(inMemoryCategoriesRepository.repository[0].id));

    const categoryTwo = new Category("Automotive", "Automotive description...");
    inMemoryCategoriesRepository.create(categoryTwo);
    categories.push(String(inMemoryCategoriesRepository.repository[1].id));

    const paymentOptions: string[] = [];
    const paymentOption = new PaymentOption("creadit_card");
    inMemoryPaymentOptionsRepository.create(paymentOption);
    paymentOptions.push(
      String(inMemoryPaymentOptionsRepository.repository[0].id)
    );

    const files: string[] = [];
    inMemoryFileRepository.create({
      path: "path",
      originalName: "original.png",
      type: "png",
    });
    files.push(String(inMemoryFileRepository.repository[0].id));

    expect(async () => {
      return await createAnnouncementUseCase.execute({
        userId: "invalid-uuid",
        announcementName: "Chevrolet Camaro",
        announcementState: "old",
        announcementDescription: "Description...",
        announcementPrice: 200000.0,
        status: true,
        isExchangeable: false,
        categoryIds: categories,
        paymentOptionIds: paymentOptions,
        fileIds: files,
      });
    }).rejects.toThrow(NotFoundException);
  });
});
