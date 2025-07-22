import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const booking = await BookingService.createBooking(
    req.body,
    decodedToken.userId
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getUserBookings();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrived successfully",
    data: bookings,
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await BookingService.getSingleBooking();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrived successfully",
    data: booking,
  });
});
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getAllBookings();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrived successfully",
    data: bookings,
  });
});
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const update = await BookingService.updateBookingStatus();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings status updated successfully",
    data: update,
  });
});

export const BookingController = {
  createBooking,
  getUserBookings,
  getSingleBooking,
  getAllBookings,
  updateBookingStatus,
};
