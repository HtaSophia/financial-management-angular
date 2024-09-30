export const isCurrentMonth = (date: Date | string) => {
    return new Date(date).getMonth() === new Date().getMonth();
};

export const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString();
};
