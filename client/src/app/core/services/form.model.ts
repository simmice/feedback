export class Form {
    post(baseURL: string, ff: Form) {
        throw new Error('Method not implemented.');
      }
      _id: { type: String; } | undefined;
      options1: { type: String; possibleValues: ['Yes', 'No']; } | undefined;
      options2: { type: String; possibleValues: [1, 2, 3, 4]; } | undefined;
      text1: { type: String; } | undefined;
      options3: { type: String; possibleValues: ['Extremely', 'Very', 'Moderately', 'Slightly', 'NOt at all']; } | undefined;
      options4: { type: String; possibleValues: ['Excellent', 'Good', 'Fair', 'Poor', 'Satisfactorily']; } | undefined;
      text2: { type: String; } | undefined
};
