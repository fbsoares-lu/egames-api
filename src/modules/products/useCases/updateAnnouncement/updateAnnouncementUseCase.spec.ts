import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemoryUserRepository } from "../../../accounts/repositories/InMemoryUserRepository";
import { InMemoryFileRepository } from "../../../files/repositories/InMemoryFileRepository";
import { Announcement } from "../../entities/Announcement";
import { Category } from "../../entities/Category";
import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryAnnouncementRepository } from "../../repositories/InMemoryAnnouncementRepository";
import { InMemoryCategoriesRepository } from "../../repositories/InMemoryCategoriesRepository";
import { InMemoryPaymentOptionsRepository } from "../../repositories/InMemoryPaymentOptionsRepository";
import { UpdateAnnouncementUseCase } from "./UpdateAnnouncementUseCase";

let inMemoryAnnouncementRepository: InMemoryAnnouncementRepository;
let inMemoryPaymentOptionsRepository: InMemoryPaymentOptionsRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryFileRepository: InMemoryFileRepository;

let updateAnnouncementUseCase: UpdateAnnouncementUseCase;

describe("Update announcement", () => {
  beforeEach(() => {
    inMemoryAnnouncementRepository = new InMemoryAnnouncementRepository();
    inMemoryPaymentOptionsRepository = new InMemoryPaymentOptionsRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryFileRepository = new InMemoryFileRepository();

    updateAnnouncementUseCase = new UpdateAnnouncementUseCase(
      inMemoryAnnouncementRepository,
      inMemoryCategoriesRepository,
      inMemoryPaymentOptionsRepository,
      inMemoryFileRepository
    );
  });

  it("should be able to update a announcement", async () => {
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

    const announcement = new Announcement(
      true,
      "Bike",
      "Bike description...",
      250,
      true
    );
    await inMemoryAnnouncementRepository.create(announcement);

    await updateAnnouncementUseCase.execute({
      id: String(inMemoryAnnouncementRepository.repository[0].id),
      announcementName: "Chevrolet Camaro",
      announcementDescription: "Description...",
      announcementPrice: 200000.0,
      status: true,
      isExchangeable: false,
      categoryIds: categories,
      paymentOptionIds: paymentOptions,
      fileIds: files,
    });

    expect(inMemoryAnnouncementRepository.repository[0].announcementName).toBe(
      "Chevrolet Camaro"
    );
  });

  it("should not be able to update a announcement with invalid id", () => {
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
      return await updateAnnouncementUseCase.execute({
        id: "invalid_uuid",
        announcementName: "Chevrolet Camaro",
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
