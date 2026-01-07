import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly username: string;
  private readonly password: string;
  private readonly from: string;
  private readonly mock: boolean;

  constructor(private readonly configService: ConfigService) {
    const sms = this.configService.get("sms") || {};
    this.username = sms.username;
    this.password = sms.password;
    this.from = sms.from;
    this.mock = sms.mock;
  }

  async sendVerification(to: string, code: string) {
    const text = `کد ورود پافی پتی: ${code}`;

    if (this.mock || !this.username || !this.password || !this.from) {
      this.logger.log(`[SMS MOCK] to:${to} code:${code}`);
      return;
    }

    try {
      await axios.post("https://rest.payamak-panel.com/api/SendSMS/SendSMS", {
        username: this.username,
        password: this.password,
        to,
        from: this.from,
        text
      });
    } catch (error) {
      this.logger.error("Failed to send SMS", error instanceof Error ? error.message : `${error}`);
      throw error;
    }
  }
}
