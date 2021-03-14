export type OfferActionMemberIdType =
    | "OFFER/FETCH_BY_MEMBER_ID"

export type OfferActionIdType =
    | "OFFER/FETCH_BY_ID"

export type OfferActionListResult =
    | "OFFER/RESULT_LIST"

export type OfferActionCreate =
    | "OFFER/CREATE"

export type OfferActionUpdate =
    | "OFFER/UPDATE"

export type OfferActionSuccess =
    | "OFFER/SUCCESS"

export type OfferActionError =
    | "OFFER/ERROR"

export type OfferAction =
    {
        type: OfferActionListResult,
        payload: {
            offers: Array<Offer>
        }
    } |
    {
        type: OfferActionMemberIdType,
        payload: {
            member_id: string
        }
    } |
    {
        type: OfferActionCreate,
        payload: {
            jwt: string,
            data: CreateOffer
        }
    } |
    {
       type: OfferActionUpdate,
       payload: {
           jwt: string,
           data: CreateOffer;
           id: string
       }
    } |
    {
        type: OfferActionSuccess,
        payload: {
            message: String,
            data: Offer
        }
    } |
    {
        type: OfferActionIdType,
        payload: {
            id: string
        }
    } |
    {
        type: OfferActionError,
        payload: {
            message: string
        }
    }

export type CreateOffer = {
    cityName: string,
    longitude: number,
    latitude: number,
    companyName: string,
    companyDescription: string,
    title: string,
    description: string,
    validityEndDate: Date,
    contractPeriodValue?: string,
    contractTypeValue: string
}

export type Offer = {
    id: string,
    cityName: string,
    longitude: number,
    latitude: number,
    company: {
        name: string,
        description: string
    }
    title: string,
    description: string,
    valid: boolean,
    validityEndDate: Date,
    contractPeriod: string,
    contractType: string,
    memberId: string
}