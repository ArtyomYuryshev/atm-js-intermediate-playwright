import { Page } from 'playwright';

export class ConfigurationComponent {
    constructor(private page: Page) {}

    get configurationBlock() {
        return this.page.locator('div.U4lDT');
    }

    get costInHeader() {
        return this.page.locator('.egBpsb .MyvX5d.D0aEmf');
    }

    get serviceTypeDDL() {
        return this.page.locator('div[jsname="HeRlU"] div.VfPpkd-aPP78e');
    }

    get soleTenantNodesServiceTypeDDLItem() {
        return this.page.locator(
            '//li[.//span[@class="VfPpkd-rymPhb-fpDzbe-fmcmS" and text()="Sole-Tenant Nodes"]]',
        );
    }

    get machineImagesServiceTypeDDLItem() {
        return this.page.locator(
            '//li[.//span[@class="VfPpkd-rymPhb-fpDzbe-fmcmS" and text()="Machine Images"]]',
        );
    }

    get numberOfInstancesIncrementButton() {
        return this.page.locator('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
    }

    get numberOfInstancesInfoButton() {
        return this.page.locator(
            '//div[@class="QiFlid"]//button[@class="pYTkkf-Bz112c-LgbsSe lUTu5e"]',
        );
    }

    get numberOfInstancesInfoPopover() {
        return this.page.locator(
            '//div[@class="zVcOL" and .//div[@class="zv7tnb ZF0dQe D0aEmf" and text()="Number of Instances"] and .//div[@class="OL1HKc" and text()="This is the number of virtual machines you want to create."]]',
        );
    }

    get numberOfInstancesInputField() {
        return this.page.locator(
            '//div[@class="QiFlid"]//input[@jsname="YPqjbf" and @type="number" and @class="qdOxv-fmcmS-wGMbrd"]',
        );
    }

    get numberOfInstancesValidationMessage() {
        return this.page.locator(
            '//div[@class="SozLZd"]//span[contains(@class, "TlwJTe") and contains(@class, "HY0Uh") and text()="Value needs to be greater than 0 and less than or equal to 50,000"]',
        );
    }

    get osDDL() {
        return this.page.locator(
            '//span[text()="Operating System / Software"]/ancestor::div[contains(@class, "VfPpkd-O1htCb")]//div[contains(@class, "VfPpkd-aPP78e")]',
        );
    }

    get osDLLUbuntuPro() {
        return this.page.locator(
            'div.VfPpkd-xl07Ob-XxIAqe ul.VfPpkd-rymPhb > li[data-value="paid-ubuntu-pro"]',
        );
    }

    get machineFamilyDDL() {
        return this.page.locator(
            '//span[@id="c27" and text()="General Purpose"]/ancestor::div[@jsname="oYxtQd"]/ancestor::div[@jsname="wSASue"]',
        );
    }

    get generalPurposeDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="general-purpose"]',
        );
    }

    get computeOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="compute-optimized"]',
        );
    }

    get memoryOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="memory-optimized"]',
        );
    }

    get acceleratorOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="accelerator-optimized"]',
        );
    }

    get storageOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="storage-optimized"]',
        );
    }

    get machineTypeDDL() {
        return this.page.locator(
            '//div[@jsname="kgDJk"]//div[@jsname="oYxtQd"]//div[@class="VfPpkd-aPP78e"]',
        );
    }

    get n1Standard1machineTypeItem() {
        return this.page.locator(
            'ul.VfPpkd-rymPhb.r6B9Fd.bwNLcf.P2Hi5d.VfPpkd-OJnkse > li[data-value="n1-standard-1"]',
        );
    }

    get n1Standard2machineTypeItem() {
        return this.page.locator(
            'ul.VfPpkd-rymPhb.r6B9Fd.bwNLcf.P2Hi5d.VfPpkd-OJnkse > li[data-value="n1-standard-2"]',
        );
    }

    get machineTypeBannerText() {
        return this.page.locator('div.VVW32d > div.D3Zlgc.MyvX5d.D0aEmf');
    }

    get vCPUsAndRamText() {
        return this.page.locator(
            '//div[@class="qPg9F bTKR0c"]//div[@class="VVW32d"]/div[@class="HY0Uh"][2]',
        );
    }

    get diskSizeInputField() {
        return this.page.locator('//input[@id="c40" and @class="qdOxv-fmcmS-wGMbrd"]');
    }

    get diskSizeValidationMessage() {
        return this.page.locator(
            '//span[@class="BpFoRd HY0Uh" and text()="Value needs to be greater than 0 and less than or equal to 65,536 GiB"]',
        );
    }

    get addItemsTextBlock() {
        return this.page.locator('//div[@class="lm3Nj"]');
    }
}
