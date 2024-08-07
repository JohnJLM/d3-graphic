# d3-graphic

`d3-graphic` is a React Native package that utilizes D3, react-native-svg, react, and lodash to display horizontal bars, vertical bars, and pie charts. This package is designed to make dashboard development in React Native much easier.

## Installation

To install this package, you can use npm or yarn:

### npm

```sh
npm install d3-graphic
```

### yarn

```sh
yarn add d3-graphic
```

## Components

The d3-graphic package includes the following components:

- MultipleHorizontalBars
- MultipleVerticalBars
- PieChart

## Common Props

The three mentioned components share the same props:

- data: An array of JSON objects containing at least three properties: one for the label, one for the value, and one for the id.
- keyLabel: The JSON property that the component uses for the label.
- keyValue: The JSON property that the component uses for the value.
- primaryKey: The JSON property that acts as the ID.

## Optional props:

- loading: Boolean that controls whether a spinner is shown while true.
- error: Boolean that shows an error message.
- withoutDataMessage: String to customize the message displayed when there is no data.
- color: An array of strings with the colors of the bars or sections of the chart.

## Usage Example

Below is an example of how to use the MultipleHorizontalBars component:

```jsx
import React from "react";
import { MultipleHorizontalBars } from "d3-graphic";

const data = [
  { nameProduct: "Apples", value: 100, id: 1 },
  { nameProduct: "Banana", value: 150, id: 2 },
  { nameProduct: "Cactus", value: 45, id: 3 },
  { nameProduct: "Dades", value: 169.48, id: 4 },
  { nameProduct: "Guitar", value: 188.4, id: 5 },
  { nameProduct: "Fruit", value: 90, id: 6 },
  { nameProduct: "Games", value: 25, id: 7 },
];

<MultipleHorizontalBars
  data={data}
  keyLabel={"nameProduct"}
  keyValue={"value"}
  primaryKey={"id"}
  error={false}
  loading={false}
/>;
```

## Example Project

You can find a project using d3-graphic on the following GitHub link. This project provides practical examples of how to use the components included in the package.

[Example Project on GitHub](https://github.com/JohnJLM/d3-graphic-react-native.git)

### Animations

- Horizontal Bars

![Horizontal Bars](https://lh3.googleusercontent.com/fife/ALs6j_EVENGIf5J1oATtaNdnu-T7F9HBAaUQu5sSU-bdKzkrONbx0Q67TiMOcrc4yfwWH9F-64JjN3w48IU_qphtTJTYEP356Y7K8ZCwhgMUyBK5DBOOLP2iJOWumz9JJWaQjbtdifbZEf_ucboZYzLmeOb6KNDoqKV4nsnf5I7vL9U-pQzRovDO1F7bSv9Bu96nk9F8zEXNCL-WJoqhVU8XejLyKzOpBDQzVGJjh7Mxio8IofRW_8b9yp-eGE8CtsKPZuVHHrgRX6ZgFkVmVLuLY3gZujUfOtcNR-OjygCGlcyIxqewLopjB76AfOISPtg1meoXEcjLCNPp8C88odYGiTSMUoXPwri0A8ds9P5jXy4BkVo-1DHluaFzVQoLPvFfjz6OWjw7VulutxZp4qrfRfc9JbYuAYj8vkfnXP9AwLoEEbmKjYxAJ8oQeqP6Qcu87fFUlO7YHUFfFxFtvlvz-HGJPUBRhLQLtrZPAwuk990P87uyP1y3aZn9qfHHN-niGrlf4G6GshqTy0eCwEwYSzsoKu-p5cIdyv4DUGHt4QEDVPvyJ1aOqGfuktbn39w3RkHC0SabTeILW5EsjnqsEP0j_-R1JtjkLsBw9hSwpB-Vum3fQq7lthJZRsUx_BG-m3c0ZuDPceadLYbX5KjpGrHvUBbxWRxXE6rRE-Kf9bj8z6EHsdQGsYbfwmmXwzFMZnP5gt12P1B2BV5-3QdKLbqMwYmBSo9_68tK37024e_E_yQNiQ4Q47J79wUDN-srOer7z99Qg-M9v8B3YDQGGmMLY8Rjsv1wWJ2TpPGYOrlrHaxMY-bjfjJ-pqmEGC2TCrQmY17zaG01Rxd0sHapESmnL8cSWwEkhHXZTAUN5_56HhrvQRkXAos3vhgQqLDVJ0fr9mQnnUtzbqbOQi5Lr_GLcqKQkM6MowS68elsXjkIwfKVB4dTtHJGIlSB83WVoaweCDV1PLbnYFlVCfXFO7fwRlFMjQ7ytqwMUCi7FDUXcncxBxXNGxmHGpk1mhnTIrVG7P68PIY_ueLG-Rvx6Yast1v47HXaA7E8w5STUmcS2MJMrgik1j2PS_eyg8AsSUNavC6RA2khzuYeUOCF5NxcxaFd4DPuq8BOfT8xgm9f5afXAezWMiixJgnQ1ROhvIC5kS0brvkU-8cAYaWNx5z_eqP9DkUblyAQHzSUZ2Yq9FIQWK0ZtsDI7fZWvQXaeK-sB41ywjg6AxvGJGHHnWbQeg4PXWAxtZ2lCJvIcfIlxgbyVsjaTGh1-cR3m6qUTk_sZbOIyUYf1UEvuokzRL_0SKEzOpyk1cA23eIYW8m6T_snMjyoEttGAF8TVDILJpeSkD_9rSSntbb3iU07ynh5QcnzmNzHoQtqiCoqhn1-L7FwbmP3ncsmOMYOoK-OLmQDgNFTonhdFRRSRLmn2UGj8RWneICWPsd1Sp9QE2a0VSmlMrfLw7leDdJnwomb4pHe6mt5TKdqFgkDqowDkO2c0uRJMtaxJrBaL9h2zphNsUZYnIDqxoFh1uENstVmUoxCaQIYvtcttFYL5HMJOzVs9xGen_GOYlIk2Ux7fKlrg9vDqVzpGBfb_xXP3wQAHnNFZsBcmkx8R6lqls0=w1920-h919)

- Vertical Bars

![Vertical Bars](https://lh3.googleusercontent.com/fife/ALs6j_FJjJB-5D0lXVyoemsCrIq1lIJLWEInC_RcAhqi7_GenFdqcuMAkkkfw34_9lEFTV7T_oAn7D1uGMGol_SJ7MP7nfBpaW6T7fBHcoI_TN-tpqU-FOQRyVS9rBy6RyMvIhiSYkqD6KNPYg6ntq04Fx3nXG0u2qH1PjmdF3wXxuRCZAdovGIfLoSNyc3b2ho7Tr2UkbEXzMGT67Tv5Xvh9TziCeEtx-pXrnn29jfiJd5OiRg8Skvy3lYq_7cScZbFNgDnIIitYul7ClW0eAL9LQWXyGYpg--SpPawpxyxc-z6FOf9r9sz5bqByGryCT-jG3FyY3GHsuXFd1s9LpfYIHMuGqfCJF3rjfcP2Dspt4874XvhzRG_JniPatOhqqDHjUtbpgxf9uwniutOdHr2ZTx3MAgauDJUilmMB7h9ad1p1BkrnKfFWRhs6y94eK7WncKZjg2CklNrzL968CEROQU_Qf3V5KvxqzpIYDe-S9YlSEIwoGc-3vtPVmsmRRQ82CV3A4YV8vV-pE4uFkwXdUtliGEG6mdMorZxf0LS9WW4iY11fQYxonxKYG-kHiPoSXLl8jl5PvFN81K3KMq2T2svfJRR-rD_iir9jfEvLPQQKqWrIeKbz7qRNVBNX1_74jvNJvZ8Mhp8zQ1LAtgTy8ilzLNVjeMjmu2ZkyWHjjVAjCgxtUg3Bat6vGXrIT3TVn7dUnMatraMthdbMOIXzA9-vEUoTZiZMwdUkgxGqG5Oayuq0HUjXlMkegULqOJE49bIB9Amsc2dsrxtqRR7ETtreQkhGklWFLH2e35OfnhsQQCVPZCPAn9rYHtQkcdPyqLXdVjPdkeCz7jaJP-Zpvcw0DsE2u6IaAkgaS76opp1gg37Z51SoI5Hiy5N4noN9j3haDKoLLrczzH8lJEUaKaVHP-EEhKW_5oWOYFqVpupfAxd-T0BkRdZbLKPHbwJI_NJTn-Nm9hTlr6cTa8zBKboifKviVywaMaWZs-0w8-bsCmwrlYxHai2IXleno3AOhLDv0h2ZP9H7Klqc581jJmY34Hw0tQztFkPLDPvxafS5cFVdDge_KybhJYABRhvenAtNzmCPyPHl9hUvvPUw3qXmHceUfssp8ry-9HECGbX6ILLAvA3Xy1M0OC9jJbvFbmFE7JtDoDTakg-FFRAQDytJRhcT9Ftc7vcNGllT-SkQXJNhoJN6bArzmiNI-7-s5_vK3HtfBE6c43Wr_EIhZOLs42vrSlE8tWoHlXt_d6DfzGaX1bRTSvzatXCOAKpfZAkF00gYf_iKmw8PlPJZiAWfCdc4_qVZW3mNM8WzdqV1sJUu_MrY1ZznRZEZQaIOABEhrP7C_RjCK9VtmCYkTrZYK8PhriPNA0yzsHonOu71AG7abJKLtQ5gAMb_XZxGs9mVicYalfqmMfiz4Ij31VwAqItkXrSgNAhFsFbPlwjGr-FGTZ8LJw1GORhSAABbGVSvQIxAtbBTq4FOFcG52ceGD0nlL6-0-AGmPTJEH9u7193TsCxnPblYu3NKuMbPsBFa8AgEIiRyiqKgw2eKJVa8HI-I_YYegB8aNoi7CXqlm4VglvlDwm_9QZJRlxMKwsTrNHX71i0Mx31R8o=w1920-h464)

- Pie Chart

![Pie chart](https://lh3.googleusercontent.com/fife/ALs6j_GlFg-oyzBTMfhhGJ7YEVd18DiDaHhSZpSNJPQ--tMO_CNZH4JLFkwgmlCyVLxCG-siEfTkLmwzLamAgd0-v1iEIh8UOgJzBo4XmpMOoa2e9pPKfhzjwHuK_dPNw1VRNZvvRfHbHppr9MuazBds-ZkjmjQAqpOUPHRMk2FMWO4kfZn11d-nU2Mew6BzB5FprZC8aNLlhU2j_xlNKtdJWiPMAg1HGnWperIn94OscnhmATB2LsTh5-9pa6paPAB1AGPlkw8A_vuLr_l_QNZq-G39xgTJD25YAu07ycJDqmC25uv11L-t63QvuSoeLPZ54e0cIlTZe2Kxf_rOfemcxqFMJ5xWqOPcSUW-_4ZXhqKbFc3dlj_wxGepZi_AQOpY70DD9t0-uIaGAGBZVkQCuP56tzqRT4NC1zjVW3h8JS1WNqD9me0_fo97KD-6-ehc0YMvbmnAyzmJCf5a9zhdse1nzp-5gND-vTeXhXfEQuMxYNwadwT-eFPMm0RyZDELLMk62VcglZ6GMRXhCWbgwyboVkaGLyw-Wekyv7wZx5AoDvD0pU_B5zz-_LTY0ce-WXU2E-SQzVW0XUQsaON6UbnoQVXzeBcAMCRYVAJ7fbXL2568ORrbQYHu9QdJn3PsoBMeaMOAIQHYXXCMobEZjIZyCXuEh4ozizZMcMR7hh71HVb1M5BQMT8Othc8yBFSRvoVYvofI1DgJ4R_lXg6SaVj9RAFy4TMPYZqWRqhYs274Ji_COaKS3t21Wz95-ZNz1R2A98x1ej-OINl1N51p05r2SF1azfy5MsDLaK0Buz4pnVpl41mRyFV8DmKErMfeIs61-ZRVxaCwKkm1m0KCeRG2N670J-3QPXxR4yyRzmfoEnH2Jon2gSQ_4zWDm64OxKpCXlw-YFSQnlDU_H1CeumyKJgYOYzq9j_Yw-r3y0cGyCITqy9XrDfblrTnbzK-InuKWLsFYYvw5zofyhuqUpE26xmpTZxvjWlZxM1R2cs4G3-aTNc83Zx2a26pplz6X3nuYOwLnCodysQq6K0x2zGjLFbPIW9lckNtqfZ6l294zdjJnqhXqICrTmRx8GjFl4JwRB_EbuhRoxNCGk8km3bsgstuPfeDLRIZpgKLm67aqProFiurw1eaugUuwvhSyvzVDPB0c7wZz8VL_pFuH8_LV73JXnAhJkQtDyNf1EI3c_vRgy96KO_d8DbNIwE5nXBbqDussp21dV2L2txLdNfRmpGq8IdBm6wQQ5VU7k8sO1gqgfFnc1kGm_VaKIv8ZMnbie-x7RZ8_7o2X3PzMwpZHB9Aa3QDxsyJiSf14MvtXLHKHTcQpKYX-Mh1Vdeghv81rg0I8lB4tn7TZzx_Ulp46Rkr_lBX-N67GUxNlpAE6hpdY58IH7hEmARWr4C2MB2tH-BqXQbLJhzTvEg0I3k7bokZ2evM1fUreoMht3Bq7Q9tmYzBZ6Aofsn4wu8RzFRcFqMjlWTWaldTFyx7lwoJodppJ7A_GaFmONqs8CnWTGldkQ10zgGQJR7exyhN2OmyEW5nXR_eBDOzB4udAWEdrGibJ2nqQAUbOakw9gCns1vptQyRjLzWzBVr6bA3oGNp0xdxf7GpB0_KrU7cQ=w1920-h464)

### Screenshots

- Horizontal Bars

  ![Horizontal Bars](https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbdE4st_IkWmiZMbeAQQSuXQACt6BCpypLjqxk2uq0Oca0hnndMTpBOHABT5D3t2LiAjOHrEpVOVGhBFBaUfuyvigGIttrT77I=w1920-h919)

  - Vertical Bars

  ![Vertical Bars](https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZYBVT1cPgVfBfv7vlzcbAnXD3yTD9XlM0C_6LhZDNIZ1_q_0PPyUiWG-fpUqPnr_QmvxMpUxnYv0DAJk1SY3Aoyv4TP-fmqJM=w1920-h919)

  - Pie Chart

  ![Pie chart](https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYN4e-JbdjY9P3uyFC23TcE5O0MykbLDGJGyq8dnaFhggoCP1uffUX3LyPTAZLhJmos0i8HuJYXOxUe1GOPcL-NLq1-Ez6CuHA=w1920-h919)
