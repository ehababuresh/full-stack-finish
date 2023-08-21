import initialCardForm from "./initialCardForm";

export default (card) => {
    if (!card) {
        return initialCardForm;
    }

    const { title, subtitle, description, phone, email, webUrl, imageUrl, imageAlt, state, country, city, street, zip, houseNumber } = card;
    return {
        title,
        subtitle,
        description,
        phone,
        email,
        webUrl,
        imageUrl,
        imageAlt,
        state,
        country,
        city,
        street,
        houseNumber,
        zip,
      
    };
};