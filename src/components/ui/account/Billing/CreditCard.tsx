import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import FormInput from "../../FormInput/FormInput";
import { useForm } from "react-hook-form";

type FieldValues = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focused: "name" | "number" | "expiry" | "cvc";
};

function CreditCard() {
  const [card, setCard] = useState<FieldValues>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "number",
  });

  const {
    register,
    // handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FieldValues>({
    values: { ...card },
  });

  watch(() => {
    const values = getValues();
    setCard({ ...values });
  });

  return (
    <div className="flex gap-8">
      <form className="flex flex-col gap-3">
        <FormInput
          label="Card Number"
          type="text"
          id="number"
          placeholder="Card Number"
          inputref={register("number", {
            required: "You should enter he credit card number!",
          })}
          errorMessage={errors.number?.message?.toString()}
        />
        <FormInput
          label="Name"
          type="text"
          id="name"
          placeholder="Name"
          inputref={register("name", {
            required: "You should enter the name of credit card owner!",
          })}
          errorMessage={errors.name?.message?.toString()}
        />
        <div className="flex gap-4 justify-between">
          <FormInput
            label="Expiry"
            type="text"
            id="expiry"
            placeholder="Expiry MM/YY"
            inputref={register("expiry", {
              required:
                "You should enter the validation date of the credit card!",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                message: "invalid date",
              },
            })}
            errorMessage={errors.expiry?.message?.toString()}
          />
          <FormInput
            label="CVC/CVV"
            type="number"
            id="cvc"
            placeholder="CVC/CVV"
            inputref={register("cvc", {
              required: "You should enter the CVC of the credit card!",
              minLength: 3,
              maxLength: 3,
            })}
            errorMessage={errors.cvc?.message?.toString()}
          />
        </div>
      </form>

      <Cards
        number={card.number}
        name={card.name}
        expiry={card.expiry}
        cvc={card.cvc}
        focused={card.focused}
      />
    </div>
  );
}

export default CreditCard;
