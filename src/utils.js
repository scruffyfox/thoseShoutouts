const utils = {
    readFile: async (file) => {
        var response = ""
        await $.ajax({
            url: file,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                response = data;
            }
        });
        return response
    },
    readFileToArray: async (file) => {
        const text = await utils.readFile(file)
        const array = text.trim().split('\n')

        const cleaned = array.filter(s => {
            return !s.startsWith('#') && s !== ''
        })

        return cleaned
    }
}