import pycountry
import csv
import numpy as np
# file1=open("Murder.csv","r")
# file2=open("Murder_new.csv","w")

# # Iterate over each line in the file
# for line in file1.readlines():
#     # line
#     # Separate each item in the line
#     items=line.split()
#     print(type(items))

#     # Retrieve important bits
#     # qty=int(items[3])
#     # reorder=int(items[4])

#     # Write to the file if conditions are met
#     # if qty<=reorder:
#         # file2.write(items[0]+"\t"+items[1]+"\n")

# # Release used resources
# file1.close()
# file2.close()





# input_countries = ['Albania', 'Antigua and Barbuda', 'Chile']
countries = {}
for country in pycountry.countries:
    countries[country.name] = country.alpha_3

with open('Murder.csv') as inputFile, open("Murder_w1.csv", mode='w') as outputFile:
    writer = csv.writer(outputFile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(["id","fillKey"])
    csv_reader = csv.reader(inputFile, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            code = countries.get(row[0], 'Unknown code')
            if(row[1]!=""):
                if (0<float(row[1]))&(float(row[1])<=5):
                    fillKey="Low"
                elif (5<float(row[1]))&(float(row[1])<=10):
                    fillKey="Mid"
                elif float(row[1])>10:
                    fillKey="High"
                # writer = csv.writer(outputFile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                writer.writerow([code,fillKey])
                line_count += 1
                    

                #  print(float(row[1]))
            
            
   

            # print(f'\t{row[0]} works in the {row[1]} department, and was born in {row[2]}.')
            
    # print(f'Processed {line_count} lines.')



# countries = {}
# for country in pycountry.countries:
#     countries[country.name] = country.alpha_3

# codes = [countries.get(country, 'Unknown code') for country in input_countries]

# print(codes) 