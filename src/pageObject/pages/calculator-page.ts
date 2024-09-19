import { Page } from 'playwright';
import { BasePage } from './base-page';
import {
    AdEstimatePopupComponent,
    ConfigurationComponent,
    CostDetailsComponent,
    DeleteNotificationComponent,
    DeleteGroupPopupComponent,
} from '../index';

export class CalculatorPage extends BasePage {
    private isMobile: boolean;

    constructor(page: Page, isMobile: boolean) {
        super(page, '/products/calculator');
        this.isMobile = isMobile;
    }

    get addEstimatePopup(): AdEstimatePopupComponent {
        return new AdEstimatePopupComponent(this.page, this.isMobile);
    }

    get configurationComponent(): ConfigurationComponent {
        return new ConfigurationComponent(this.page);
    }

    get costDetails(): CostDetailsComponent {
        return new CostDetailsComponent(this.page);
    }

    get deleteNotification(): DeleteNotificationComponent {
        return new DeleteNotificationComponent(this.page);
    }

    get deleteGroupPopup(): DeleteGroupPopupComponent {
        return new DeleteGroupPopupComponent(this.page);
    }
}
